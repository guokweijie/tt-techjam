// 'use client';

// import React, { useState } from 'react';
// import axios from 'axios';
// import { FileObject } from './../imgContext';

// interface PostPageClientProps {
//   files: FileObject[];
//   accesstoken: string;
// }

// const PostPageClient: React.FC<PostPageClientProps> = ({ files, accesstoken }) => {
//   const [uploadStatus, setUploadStatus] = useState<string | null>(null);

//   const handlePost = async (file: FileObject) => {
//     setUploadStatus('Uploading...');
//     try {
//       const response = await axios.post(
//         'https://open-api.tiktok.com/v1/media/upload',
//         {
//           access_token: accesstoken,
//           media_data: file.file,
//           media_type: 'image', // assuming you're uploading images
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status === 200) {
//         setUploadStatus('Upload successful!');
//       } else {
//         setUploadStatus(`Upload failed: ${response.statusText}`);
//       }
//     } catch (error) {
//       // @ts-ignore
//         setUploadStatus(`Upload error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h1>PostPage</h1>
//       <p>Access Token: {accesstoken}</p>
//       <div>
//         {files.map((file, index) => (
//           <div key={index}>
//             <p>Name: {file.name}</p>
//             <p>Size: {file.size}</p>
//             <button onClick={() => handlePost(file)}>Post to TikTok</button>
//           </div>
//         ))}
//       </div>
//       {uploadStatus && <p>{uploadStatus}</p>}
//     </div>
//   );
// };

// export default PostPageClient;
