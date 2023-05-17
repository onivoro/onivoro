import { addDoc, collection, DocumentReference, Firestore, updateDoc, deleteDoc, getDoc, doc, collectionChanges, docSnapshots, setDoc, collectionSnapshots, DocumentData, Query, onSnapshot } from "@angular/fire/firestore";
import { map } from "rxjs";
import { IIdentifiable } from "../types/identifiable.interface";

export abstract class AbstractRepository<TDoc extends IIdentifiable> {
    abstract collectionName: string;
    abstract firestore: Firestore;

    async create(doc: TDoc) {
        return await addDoc(this.#getCollection(), doc);
    }

    async patch(doc: Partial<TDoc>, mergeFields = []) {
        return await setDoc(this.#getDocRef(doc.id as any), doc, { merge: true, mergeFields });
    }

    async upsert(doc: TDoc) {
        return await setDoc(this.#getDocRef(doc.id), doc, { merge: false });
    }

    async del(id: string) {
        const docRef = this.#getDocRef(id);
        return await deleteDoc(docRef);
    }

    async update(doc: TDoc, docRef: DocumentReference) {
        return await updateDoc(docRef, doc);
    }

    async get(id: string) {
        return await getDoc(this.#getDocRef(id));
    }

    get$(id: string) {
        const docRef = this.#getDocRef(id);
        return docSnapshots(docRef).pipe(map(snapshot => snapshot.data()));
    }

    list$() {
        return collectionSnapshots(this.#getCollection()).pipe(
            map(res => res.map(this.#convertDoc)));
    }

    #convertDoc(doc: any) {
        return { ...doc.data(), id: doc.id };
    }

    #getDocRef(id: string) {
        return doc(this.firestore, this.collectionName, id);
    }

    #getCollection() {
        return collection(this.firestore, this.collectionName);
    }
}
