import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;


// eğer MONGODB_URI degıskenı yoksa hata fırlatacak
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}


// global.mongoose önbellekteki MongoDB bağlantısını temsıl eder. Ve bu değeri cached degıskenıne atadık. 
let cached = global.mongoose;

// cached degıskenını kontrol ettık ve tanımlanmamıssa conn ve promise degerlerine sahip bir nesne atadık. Bu nesneyı cached e ılk atamamızda bu kosula gırecek ve sonrakı ısteklerde aynı baglantı kullanılacak.
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}


// MongoDB baglantısını gerceklestırmek ve onbellektekı baglantıyı kontro etmek ıcın bır async fonksıyon olusturduk.
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

console.log("Connected to MongoDB");

// yukarıdakı yapı bağlantı olusturulmasını ve tekrar tekarar baglantı olustuurlmasını onleyerek performansı arttırır. Ilk baglantı olusuturulduktan sonra, 'dbConnect' fonksıtonu cagırıldıgında onbellekteki baglantı hızlı bır sekılde dondurulur... 

export default dbConnect;