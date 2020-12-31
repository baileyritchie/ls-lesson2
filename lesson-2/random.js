/* algorithm for 'studentAboveClassAverage'
input - a single student object with mark, first name, last name and age properties on the obj
output - true, false or null depending on the student's grade

rules:
assume that you will always get an object with the correct student properties

algorithm (pseudocode):
determine if the current's student objects grade is above the average
  if it is return true
  if it is not return false
  if it is neither (or equal to) return null;
*/

const studentAboveClassAverage = (student) => {
  let avg = getClassAverage();
  if (student.mark > avg) {
    return true;
  } else if (student.mark < avg) {
    return false;
  } else return null;
};