const vechicleNumber= "jkghs85";
let hour = 12;
let amount =0;

if(hour <=2 || vechicleNumber.startsWith("VIP")) {
    let status = "VIP";
    let amount = 0;
    if(status !== "VIP"){
        status ="Normal";
    }
    console.log(`Status: ${status}, Amount: ${amount}, Hour: ${hour}`);

}

let totalAmount = hour*30;
if(totalAmount<=300){
    
    console.log(`Status: Normal, Amount: ${totalAmount}, Hour: ${hour}`);
}