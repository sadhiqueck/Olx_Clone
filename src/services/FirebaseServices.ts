import { auth, db } from '../config/FirebaseConfig'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { FormData as FormDataType,ProductIF } from '../types/product';
import { uploadImage } from './cloudinaryServices';


export const registerUser = async (username: string, email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;


        await setDoc(doc(db, "users", user.uid), {
            username,
            email,
            joinDate: Date.now()
        });

        console.log(user);
        return { username, email, uid: user.uid };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};


export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
            const userData = userDoc.data();
            return { username: userData.username, email: userData.email, uid: user.uid };
        } else {
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            throw new Error(error.message);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export const uploadProduct = async (data: FormDataType, images: File[]) => {
    try {
        const imageUrls = await uploadImage(images);

        await addDoc(collection(db, "products"), {
            ...data,
            images: imageUrls,
            createdAt: Date.now()
        });

        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            throw new Error(error.message);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};


export const getAllProducts = async (): Promise<ProductIF[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));

        const productsArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<ProductIF, 'id'>)
        }));

        return productsArray;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
