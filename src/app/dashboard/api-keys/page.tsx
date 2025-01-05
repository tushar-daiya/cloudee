import { getApiKeys } from "@/app/actions/fetchers";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";
import React from "react";
import GenerateApiKey from "./GenerateApiKey";
import DeleteApiKey from "./DeleteApiKey";

export default async function page() {
  const apiKey = await getApiKeys();
  return (
    <div className="px-4">
      <div className="flex py-4 border-b">
        <h1 className="text-3xl font-bold">API Keys</h1>
      </div>
      {apiKey?.data?.apiKey ? (
        <div className="flex items-center justify-between border rounded-lg py-10 px-5 mt-4">
          <div className="flex items-center">
            <KeyRound size={48} />
            <div className="ml-4">
              <p className="text-lg font-bold text-muted-foreground">API Key</p>
              <p className="text-lg font-bold">{apiKey?.data?.apiKey}</p>
            </div>
          </div>
          <DeleteApiKey />
        </div>
      ) : (
        <div className="mt-4 border rounded-lg py-10 flex flex-col items-center">
          <KeyRound size={48} />
          <p className="mt-2 text-lg font-bold text-muted-foreground">
            No API keys found
          </p>
          <GenerateApiKey />
        </div>
      )}
    </div>
  );
}
