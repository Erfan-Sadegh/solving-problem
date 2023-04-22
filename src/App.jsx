import { useRef, useState } from 'react';

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [sortEmployeeData, setSortEmployeeData] = useState([]);

  const employeeId = useRef();
  const arrEmployee = useRef();
  const exitEmployee = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const arrivalTimeRaw = arrEmployee.current.value;
    const [arrivalHour, arrivalMinute = 0] = arrivalTimeRaw.split(':');
    const exitTimeRaw = exitEmployee.current.value;
    const [exitHour, exitMinute = 0] = exitTimeRaw.split(':');

    // convert hour and minute to Date object
    const arrivalTime = new Date(
      `01/01/2022 ${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute
        .toString()
        .padStart(2, '0')}`
    );
    const exitTime = new Date(`01/01/2022 ${exitHour}:${exitMinute}`);

    // Calculate Duration
    const timeDiffInMs = Math.abs(exitTime.getTime() - arrivalTime.getTime());
    const timeDiffInMinutes = Math.round(timeDiffInMs / 1000 / 60);

    const newEmployeeData = {
      [employeeId.current.name]: employeeId.current.value,
      [arrEmployee.current.name]: arrEmployee.current.value,
      [exitEmployee.current.name]: exitEmployee.current.value,
      duration: timeDiffInMinutes,
    };

    setEmployeeData((preData) => {
      return [...preData, newEmployeeData];
    });

    setSortEmployeeData((preData) => {
      return [...preData, newEmployeeData];
    });

    employeeId.current.value = '';
    arrEmployee.current.value = '';
    exitEmployee.current.value = '';
  };

  const handleSort = () => {
    const sortedData = [...employeeData].sort((a, b) => a.arrival - b.arrival);
    setSortEmployeeData(sortedData);
  };

  const handleReset = () => {
    setSortEmployeeData(employeeData);
  };

  return (
    <div className='md:w-1/2 lg:w-1/3 md:mx-auto mx-10'>
      <p className='text-gray-500 text-center mt-2'>
        ساعات ورود و خروج را به فرمت 24 ساعت وارد کنید.
      </p>
      <form
        action=''
        method=''
        onSubmit={handleSubmit}
        className='w-full mt-[1.3rem] bg-white shadow-md rounded-md p-4'
      >
        <div className='input-group flex flex-col my-4'>
          <label htmlFor='id'>کد پرسنلی: </label>
          <input
            ref={employeeId}
            type='text'
            name='id'
            id='id'
            className='mt-2 bg-gray-100 rounded p-2 outline-blue-200'
          />
        </div>
        <div className='input-group flex flex-col my-4'>
          <label htmlFor='arrival'>ساعت ورود: </label>
          <input
            ref={arrEmployee}
            type='text'
            name='arrival'
            id='arrival'
            placeholder='مثال: 8 یا 8:00'
            className='mt-2 bg-gray-100 rounded p-2 outline-blue-200'
          />
        </div>
        <div className='input-group flex flex-col my-4'>
          <label htmlFor='exit'>ساعت خروج: </label>
          <input
            ref={exitEmployee}
            type='text'
            name='exit'
            id='exit'
            placeholder='مثال: 22 یا 22:00'
            className='mt-2 bg-gray-100 rounded p-2 outline-blue-200'
          />
        </div>
        <button
          type='submit'
          className='px-6 py-2 bg-blue-600 text-white rounded'
        >
          ثبت
        </button>
      </form>

      <table className='mt-7 w-full text-center'>
        <thead>
          <tr className='border'>
            <th className='border p-2 text-[14px]'>کد پرسنلی</th>
            <th className='border p-2 text-[14px]'>ساعت ورود</th>
            <th className='border p-2 text-[14px]'>ساعت خروج</th>
            <th className='border p-2 text-[14px]'>مدت زمان حضور (دقیقه)</th>
          </tr>
        </thead>
        <tbody>
          {sortEmployeeData.length !== 0 &&
            sortEmployeeData.map((employee) => {
              return (
                <tr className='border' key={employee.id}>
                  <td className='border p-2'>{employee.id}</td>
                  <td className='border p-2'>{employee.arrival}</td>
                  <td className='border p-2'>{employee.exit}</td>
                  <td>{employee.duration}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {sortEmployeeData.length !== 0 && (
        <>
          <button
            onClick={handleSort}
            className='px-6 py-2 mt-4 bg-green-600 text-white rounded'
          >
            مرتب سازی
          </button>
          <button
            onClick={handleReset}
            className='px-6 py-2 mt-4 ml-5 bg-gray-500 text-white rounded'
          >
            ریست
          </button>
        </>
      )}
    </div>
  );
}

export default App;
