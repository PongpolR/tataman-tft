import Header from './components/Header';
import List from './components/post/List';

import { Noto_Sans_Thai } from 'next/font/google';

const prompt = Noto_Sans_Thai({
  subsets: ['thai', 'latin'], // Ensure Thai subset is included
  weight: ['400', '500', '700'], // Choose the font weights you need
});

const Page = () => {

  return (
    <div className={prompt.className}>
      <Header />
      <List />
    </div>
  );
}

export default Page;
