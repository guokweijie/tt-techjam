import FileUploader from "@/components/file-uploader";

interface User {
  id: number;
  name: string;
}

export default async function Home() {


  return (
    <div className="flex flex-col items-center py-6 md:py-8 lg:py-12">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          SequenceSnap
        </h1>
        <p className="text-sm capitalize text-gray-600">
          Smart Sequencing Made Easy.
        </p>
      </div>

      <FileUploader />
    </div>
  );
}
