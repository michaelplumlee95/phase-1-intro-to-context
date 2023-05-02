// Your code here
function createEmployeeRecord(employeeData) {
  const [firstName, familyName, title, payPerHour] = employeeData;
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date,
    hour: parseInt(hour),
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour),
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
  const wages = datesWorked.reduce(
    (totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date),
    0
  );
  return wages;
}

function calculatePayroll(employeesRecords) {
  const wages = employeesRecords.map((employeeRecord) =>
    allWagesFor(employeeRecord)
  );
  const totalWages = wages.reduce((total, wage) => total + wage, 0);
  return totalWages;
}
