import CppExecuter from '../containers/cppExecuter';
import JavaExecuter from '../containers/javaExecuter';
import PythonExecuter from '../containers/pythonExecuter';
import CodeExecuterStrategy from '../types/CodeExecuterStrategy';

function createExecuter(codeLanguage: string): CodeExecuterStrategy | null{
  if(codeLanguage.toLowerCase() === 'python'){
    return new PythonExecuter();
  } else if (codeLanguage.toLowerCase() === 'cpp') {
    return new CppExecuter();
  } else if (codeLanguage.toLowerCase() === 'java') {
    return new JavaExecuter();
  } else {
    return null;
  }
}

export default createExecuter;
