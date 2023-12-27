const serialize = (input : any) => {
  return JSON.parse(JSON.stringify(input));
}

export default serialize