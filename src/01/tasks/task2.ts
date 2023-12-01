import { readFile } from 'fs/promises';

const Task = async () => {
  const data = await readFile(`${__dirname}/../../../input/01/input2.txt`, {
    encoding: 'utf8'
  });
};

export default Task;
