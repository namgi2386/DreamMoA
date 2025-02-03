import i1 from "./../assets/test/i1.png";
import i2 from "./../assets/test/i2.png";

export function getTestImage (testImageId){
  switch (testImageId) {
    case 1: return i1;
    case 2: return i2;
    default: return null;
  }
}
