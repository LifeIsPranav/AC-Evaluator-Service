import CppExecuter from '../containers/cppExecuter';
import JavaExecuter from '../containers/javaExecuter';
import PythonExecuter from '../containers/pythonExecuter';
import CodeExecuterStrategy from '../types/CodeExecuterStrategy';

function createExecuter(codeLanguage: string): CodeExecuterStrategy | null{
  if(codeLanguage === 'PYTHON'){
    return new PythonExecuter();
  } else if (codeLanguage === 'CPP') {
    return new CppExecuter();
  } else if (codeLanguage === 'JAVA') {
    return new JavaExecuter();
  } else {
    return null;
  }
}

export default createExecuter;
