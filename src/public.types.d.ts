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


type SpaService = {
  id: number,
  name: string,
  description: string,
  price: number,
  type: string,
  image: string
}