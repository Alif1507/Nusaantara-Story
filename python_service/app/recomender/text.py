import re

def norm_text(s:str) -> str:
  s = (s or "").lower()
  s = re.sub(r"[^\w\s]", " ", s)
  s = re.sub(r"\s+", " ", s).strip()
  return s

IDN_STOP = set("yang di ke dari dan untuk pada sebagai adalah dengan atau tidak ...".split())