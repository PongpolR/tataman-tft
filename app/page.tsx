import Header from './components/Header';
import List from './components/post/List';

import { Prompt } from 'next/font/google';

const prompt = Prompt({
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
