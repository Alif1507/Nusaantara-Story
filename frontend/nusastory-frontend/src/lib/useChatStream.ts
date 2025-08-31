import { useState } from "react";
import { api } from "./apiToken";
import type { ChatMsg } from "../types";

type SendOpts = {
  system?: string;
  model?: string;
  temperature?: number;
  max_output_tokens?: number;
};

export function useChatStream() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string>("");
  const [streamingText, setStreamingText] = useState<string>("");

  async function send(userText: string, opts?: SendOpts) {
    setError("");
    setStreamingText("");
    const history = [...messages, { role: "user", text: userText } as ChatMsg];
    setMessages(history);
    setLoading(true);

    let accumulated = ""; // <--- kunci: tampung delta di variabel lokal

    try {
      const authHeader = (api.defaults.headers.common as any)?.Authorization;
      const res = await fetch(
        (import.meta.env.VITE_API_URL ?? "http://localhost:8000") + "/api/ai/chat/stream",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(authHeader ? { Authorization: authHeader } : {}),
          },
          body: JSON.stringify({
            messages: history,
            system: opts?.system ?? "You are a helpful assistant.",
            model: opts?.model,
            temperature: opts?.temperature,
            max_output_tokens: opts?.max_output_tokens,
          }),
        }
      );

      if (!res.ok || !res.body) {
        const body = await res.text().catch(() => "");
        setError(`HTTP ${res.status} streaming init failed\n${body}`);
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Optional: timeout kalau tidak ada data sama sekali
      let gotAnyChunk = false;
      const timeout = setTimeout(() => {
        if (!gotAnyChunk) {
          setError("No stream data received (timeout).");
          try { reader.cancel(); } catch {}
          setLoading(false);
        }
      }, 15000); // 15s

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        gotAnyChunk = true;
        buffer += decoder.decode(value, { stream: true });

        // pecah event SSE dengan \n\n atau \r\n\r\n
        let sepIndex: number;
        const SEP = /\r?\n\r?\n/;
        while ((sepIndex = buffer.search(SEP)) !== -1) {
          const rawEvent = buffer.slice(0, sepIndex).trim();
          buffer = buffer.slice(sepIndex + (buffer[sepIndex] === "\r" ? 4 : 2)); // aman untuk \r\n\r\n / \n\n

          if (!rawEvent) continue;

          // Ambil baris "data: ..."
          const lines = rawEvent.split(/\r?\n/);
          const dataLine = lines.find((l) => l.startsWith("data:"));
          if (!dataLine) continue;

          const payload = dataLine.replace(/^data:\s?/, "");

          // beberapa provider kirim "[DONE]" saat selesai
          if (payload === "[DONE]" || payload === "\"[DONE]\"") continue;

          try {
            const json = JSON.parse(payload);
            const delta = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
            if (delta) {
              accumulated += delta;           // update lokal
              setStreamingText(accumulated);  // render progres
            }
            // Bisa juga cek finishReason === "STOP" dari json, tapi biarkan loop selesai alami.
          } catch {
            // Non-JSON event -> abaikan
          }
        }
      }

      clearTimeout(timeout);

      // Finalize: tambahkan satu pesan 'model' dengan isi yang terkumpul
      setMessages((prev) => [...prev, { role: "model", text: accumulated }]);
      setStreamingText("");
    } catch (e: any) {
      setError(e?.message || "Stream error");
    } finally {
      setLoading(false);
    }
  }

  return { messages, send, loading, error, streamingText, setMessages };
}
