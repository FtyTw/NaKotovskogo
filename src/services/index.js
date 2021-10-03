export const ErrorHandler = ({ error, cameFrom, moduleName }) => {
  console.log(`${moduleName}--->${cameFrom}--->`, String(error))
}

export default {
  ErrorHandler
}
