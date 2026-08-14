"use client";

import { Button } from "@/components/ui/button";
import { listModels,testGemini } from "@/actions/test.actions";

export default function TestPage() {
  async function handleTest() {
    const response = await testGemini();

    console.log(response);
  }

  return (
    <>
      <Button onClick={handleTest}>Test Gemini</Button>
    </>
  );
}
