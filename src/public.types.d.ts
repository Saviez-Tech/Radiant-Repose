interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  }
  category: string;
}
