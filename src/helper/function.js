export const gerenateCode = (value) => { 
    let output = ''
    value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(' ').forEach(item =>{
        output+= item.charAt(1) + item.charAt(0)
    })
    return output
 }
