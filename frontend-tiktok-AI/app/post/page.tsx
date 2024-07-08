import React from 'react';
import { FileObject } from './../imgContext';

import PostPageClient from './PostPageClient';

interface PostPageProps {
  files: FileObject[];
  accesstoken: string;
}

const PostPage: React.FC<PostPageProps> = ({ files, accesstoken }) => {
  return <PostPageClient files={files} accesstoken={accesstoken} />;
};

export default PostPage;
