<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiChatController extends Controller
{

    private function streamSseOnce(string $text, int $code = 200)
{
    return response()->stream(function () use ($text) {
        $payload = [
            'candidates' => [[
                'content' => [
                    'parts' => [['text' => $text]],
                    'role'  => 'model',
                ],
                'finishReason' => 'STOP',
                'index' => 0,
            ]],
            'modelVersion' => config('services.gemini.model', 'gemini-2.5-flash'),
        ];
        echo 'data: '.json_encode($payload, JSON_UNESCAPED_UNICODE)."\n\n";
        @ob_flush(); @flush();
    }, $code, [
        'Content-Type'      => 'text/event-stream',
        'Cache-Control'     => 'no-cache, no-transform',
        'Connection'        => 'keep-alive',
        'X-Accel-Buffering' => 'no',
    ]);
}

public function stream(Request $request)
{
    $validated = $request->validate([
        'messages' => ['required','array','min:1'],
        'messages.*.role' => ['required','in:user,model'],
        'messages.*.text' => ['required','string'],
        'system' => ['nullable','string'],
        'temperature' => ['nullable','numeric'],
        'max_output_tokens' => ['nullable','integer'],
        'model' => ['nullable','string'],
    ]);

    $model  = config('services.gemini.model', 'gemini-2.5-flash');

    $contents = array_map(fn($m) => [
        'role'  => $m['role'],
        'parts' => [['text' => $m['text']]],
    ], $validated['messages']);

    $payload = [
        'contents' => $contents,
        'generationConfig' => array_filter([
            'temperature'     => $validated['temperature'] ?? 0.7,
            'maxOutputTokens' => $validated['max_output_tokens'] ?? 1024,
        ]),
    ];

    if (!empty($validated['system'])) {
        $payload['systemInstruction'] = [
            'parts' => [['text' => $validated['system']]],
        ];
    }

    $apiKey = config('services.gemini.api_key');
    if (!$apiKey) {
        return response()->json(['message' => 'GEMINI_API_KEY missing'], 500);
    }

    $lastUser = null;
for ($i = count($validated['messages']) - 1; $i >= 0; $i--) {
    if (($validated['messages'][$i]['role'] ?? null) === 'user') {
        $lastUser = $validated['messages'][$i]['text'] ?? '';
        break;
    }
}

    $personaSystem = <<<TXT
[NAMA] Nasa
[PERAN] Asisten ramah rekomendasi cerita rakyat Indonesia & penulis profesional.
[GAYA] Hangat, jelas, ringkas; Indonesia baku santai; 0–1 emoji saja.
[ATURAN] Rekomendasi = Judul — Daerah — Ringkasan 1–2 kalimat.
Menulis cerita = Judul, Ringkasan, Tokoh, Latar, Alur 3 babak, Naskah 600–900 kata, Pesan moral.
[CATATAN] Hormati budaya; bila ragu pada fakta, katakan tidak yakin & sarankan verifikasi.
TXT;

    $systemFromClient = (string)($request->input('system') ?? '');
    $extraSystem = '';

    $lastUser = null;
    foreach (array_reverse($request->input('messages', [])) as $m) {
        if (($m['role'] ?? '') === 'user') { $lastUser = (string)($m['text'] ?? ''); break; }
    }
    $normalized = mb_strtolower(trim($lastUser ?? ''), 'UTF-8');

    $rules = [
        // siapa kamu
        '/\b(kamu\s+siapa|siapa\s+kamu)\b/u' =>
            "Halo! Aku **Nasa**, asisten AI yang siap merekomendasikan cerita rakyat Indonesia dan membantu menulismu jadi lebih rapi & menarik. Tanyakan daerah/tema favoritmu, ya! 😊",
        // bantuan
        '/\b(help|bantuan|cara pakai|fitur)\b/u' =>
            "Aku bisa:\n• Rekomendasi cerita rakyat (judul—daerah—ringkasan)\n• Menulis/merapikan cerita\n• Meringkas isi cerita\n• Memberi konteks budaya/asal-usul\nContoh: “rekomendasi cerita rakyat Jawa Tengah”, “tulis cerita tentang Malin Kundang versi modern untuk anak SD”.",
        // siapa pembuatmu
        '/\b(pembuatmu|yang membuatmu|siapa yang bikin kamu)\b/u' =>
            "Aku Nasa, asisten AI di aplikasimu. Aku berjalan lewat model Gemini dan logika khusus di servermu.",
        // ping
        '/^\s*ping\s*$/u' => "pong 🛰️",
    ];
    foreach ($rules as $regex => $answer) {
        if ($normalized !== '' && preg_match($regex, $normalized)) {
            return $this->streamSseOnce($answer);
        }
    }

    $enrichers = [
        // Minta tulis cerita / dongeng / cerpen
        '/\b(tulis|buat|karang|kembangkan)\b.*\b(cerita|dongeng|cerpen)\b/u' =>
            "Saat menulis cerita: buat alur 3 babak jelas, deskriptif namun padat, 600–900 kata, tokoh & latar Indonesia, akhiri dengan pesan moral singkat.",
        // Rekomendasi cerita rakyat
        '/\b(rekom|rekomendasi|saran)\b.*\b(cerita rakyat|dongeng)\b/u' =>
            "Berikan 5–7 rekomendasi, tiap item: Judul — Daerah — Ringkasan 1–2 kalimat. Variasikan provinsi/etnis bila memungkinkan.",
        // Ringkas
        '/\b(ringkas|meringkas|summary|ringkasan)\b/u' =>
            "Berikan ringkasan 3–5 poin inti + 1 kalimat pesan moral/budaya.",
        // Konteks budaya/asal-usul/fakta
        '/\b(asal[- ]?usul|sejarah|budaya|adat|mitos|legenda|folklor)\b/u' =>
            "Fokus pada konteks Indonesia, jelaskan singkat & hormat; jika ada variasi versi, sebutkan ringkas.",
    ];
    foreach ($enrichers as $regex => $extra) {
        if ($normalized !== '' && preg_match($regex, $normalized)) {
            $extraSystem .= "\n\n".$extra;
            break; // cukup satu enrichers aktif
        }
    }

    $finalSystem = trim($personaSystem."\n\n".$extraSystem.($systemFromClient ? "\n\n".$systemFromClient : ''));

    $payload['systemInstruction'] = [
        'parts' => [['text' => $finalSystem]],
    ];
    $apiKey = config('services.gemini.api_key');
    $model  = config('services.gemini.model', 'gemini-2.5-flash');
    $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:streamGenerateContent?alt=sse&key=".urlencode($apiKey);

    $upstream = Http::withHeaders(['Content-Type' => 'application/json'])
        ->withOptions(['stream' => true])
        ->post($url, $payload);

    if ($upstream->failed()) {
        return response()->json([
            'message' => 'Gemini upstream error',
            'upstream_status' => $upstream->status(),
            'raw' => $upstream->body(),
        ], $upstream->status() ?: 500);
    }

    return response()->stream(function () use ($upstream) {
        ignore_user_abort(true);
        $body = $upstream->toPsrResponse()->getBody();
        while (!$body->eof()) {
            $chunk = $body->read(8192);
            if ($chunk === '' || $chunk === false) { usleep(20_000); continue; }
            echo $chunk;
            @ob_flush(); @flush();
        }
    }, 200, [
        'Content-Type'      => 'text/event-stream',
        'Cache-Control'     => 'no-cache, no-transform',
        'Connection'        => 'keep-alive',
        'X-Accel-Buffering' => 'no',
    ]);
}





}
