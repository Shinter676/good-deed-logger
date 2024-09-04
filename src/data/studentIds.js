export const studentIds = [
  // Class 1-1
  { id: '11001', class: '1-1' },
  { id: '11002', class: '1-1' },
  { id: '11003', class: '1-1' },
  { id: '11004', class: '1-1' },
  { id: '11005', class: '1-1' },
  // Class 1-2
  { id: '12001', class: '1-2' },
  { id: '12002', class: '1-2' },
  { id: '12003', class: '1-2' },
  { id: '12004', class: '1-2' },
  { id: '12005', class: '1-2' },
  // Class 1-3
  { id: '13001', class: '1-3' },
  { id: '13002', class: '1-3' },
  { id: '13003', class: '1-3' },
  { id: '13004', class: '1-3' },
  { id: '13005', class: '1-3' },
  // Class 1-4
  { id: '14001', class: '1-4' },
  { id: '14002', class: '1-4' },
  { id: '14003', class: '1-4' },
  { id: '14004', class: '1-4' },
  { id: '14005', class: '1-4' },
  // Class 1-5
  { id: '15001', class: '1-5' },
  { id: '15002', class: '1-5' },
  { id: '15003', class: '1-5' },
  { id: '15004', class: '1-5' },
  { id: '15005', class: '1-5' },
];

export const validateStudentId = (id) => {
  return studentIds.some(student => student.id === id);
};

export const getStudentClass = (id) => {
  const student = studentIds.find(student => student.id === id);
  return student ? student.class : null;
};