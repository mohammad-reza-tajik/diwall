export  const IdGenerator =function () {
    return (Math.random()+ Math.random()).toString(16).slice(2)+
           (Math.random()+Math.random()).toString(36).slice(2)+
           new Date().getTime().toString(36);


}



