import { Tokenizer } from "@anush008/tokenizers";


const cwd = process.cwd().replace('/local/build/programs/server', '/local/build/programs/web.browser/app/tokenizer.json')
const tokenizer = await Tokenizer.fromFile(cwd);
const wpEncoded = await tokenizer.encode("Who is John?");

setInterval(() => {
  console.log(wpEncoded.getLength());
  console.log(wpEncoded.getTokens());
  console.log(wpEncoded.getIds());
  console.log(wpEncoded.getAttentionMask());
  console.log(wpEncoded.getOffsets());
  console.log(wpEncoded.getOverflowing());
  console.log(wpEncoded.getSpecialTokensMask());
  console.log(wpEncoded.getTypeIds());
  console.log(wpEncoded.getWordIds());
}, 5000);

export default tokenizer; 