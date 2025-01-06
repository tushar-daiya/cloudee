import { getFilesandFolders } from "@/app/actions/fetchers";
import DataTable from "./DataTable";

export default async function page(props: {
  searchParams?: Promise<{
    page: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { data } = await getFilesandFolders(searchParams?.page);
  console.log(data);
  return (
    <div>
      <div className="flex p-4 border-b">
        <h1 className="text-3xl font-bold">Media Explorer</h1>
      </div>
      <div className="p-4">
        <p>
          Showing{" "}
          {data?.folders?.length > 0 && data?.folders?.length + " folders and"}{" "}
          {data?.files?.length} files
        </p>
        <div className="my-4">
          <DataTable folders={data?.folders} files={data?.files} />
        </div>
      </div>
    </div>
  );
}