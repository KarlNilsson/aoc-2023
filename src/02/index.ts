import Task1 from './tasks/task1';
import Task2 from './tasks/task2';

const timeMeasurement = process.argv[3];
const measureTiming = timeMeasurement?.toUpperCase() === 'TRUE';

const main = async () => {
  const [t1Result1, t1Result2, t2Result1, t2Result2] = await Promise.all([
    Task1('input1.txt', measureTiming),
    Task1('input2.txt', measureTiming),
    Task2('input1.txt', measureTiming),
    Task2('input2.txt', measureTiming),
  ]);

  console.log(`Task 1 (input 1.txt): ${t1Result1}`);
  console.log(`Task 1 (input 2.txt): ${t1Result2}`);
  console.log(`Task 2 (input 1.txt): ${t2Result1}`);
  console.log(`Task 2 (input 2.txt): ${t2Result2}`);
};

export default main;
