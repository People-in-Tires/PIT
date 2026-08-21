'use client'

export function goToPage(page: string) {
  const a = document.createElement("a");
  a.href = page;
  a.click();
  return (<></>)
}
