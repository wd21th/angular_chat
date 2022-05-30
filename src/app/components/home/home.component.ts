import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

import {
  collection,
  doc,
  docData,
  DocumentReference,
  CollectionReference,
  Firestore,
  onSnapshot,
  query,
  where,
  Unsubscribe,
  Query,
  DocumentData,
  collectionData,
  collectionChanges,
  docSnapshots,
  getDocs
} from '@angular/fire/firestore';


import { Observable } from 'rxjs';
import { addDoc } from 'firebase/firestore';

interface Item {
  name: string,
  email: string,
  photoURL: string,
  uid: string,
  msg: string,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', 'left-sidebar.component.css'],
})
export class HomeComponent implements OnInit {
  
  my_uid: string |undefined = "";
  
  user$ = this.usersService.currentUserProfile$;
  
  chats: any
  
  
  item$: Observable<Item[]> | undefined;
  
  users!: Array<Item>;
  
  datas: Array<Item> = [];
  data: any;
  
  selected_chat: string = "";
  
  
  history: Array<Item> = [];
  
  
  subscriber: any;
  
  constructor(private usersService: UsersService,
    
    private afs: Firestore,
    private authService: AuthService,
    ) {
      this.get_document()
      
      this.my_uid = this.authService.get_uid()
      
    }
    
    ngOnInit(): void {}
    
    
    
    async  get_document(){
      console.log( "Document ", 
      await docData<Item>(
        doc(this.afs, 'users', "XNNK0O7X8eYsAMdXP7emfCBgVcA3")  as DocumentReference<Item>
        
        ))
        
        const querySnapshot = await getDocs(collection(this.afs, "users"));
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          console.log(doc.data())
          
          // if(doc.data().uid == "")
          this.data = doc.data()
          
          this.datas.push(this.data)
          //this.users.push(this.data)
          
          
        });
        
        console.log(this.users)
        
      }
      
      set_selected_chat(chat_id: string){
        this.selected_chat = chat_id
        // console.log( this.selected_chat )
        this.load_history()
      }
      
      async load_history(){
        const path = [
          "users",
          this.my_uid,
          "chats",
          this.selected_chat,
          "messages"
        ].join("/")
        
        const querySnapshot = await getDocs(collection(this.afs, path));
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          console.log(doc.data())
          
          // if(doc.data().uid == "")
          // this.data = doc.data()
          let data = doc.data()
          this.history.push(data as any)
          //this.users.push(this.data)
          
          this.subscriber = onSnapshot(collection(this.afs, path), snapshot=>{
            
            // this.history = snapshot.docs.map(doc => doc.data() as any)
            
            
            let arr = snapshot.docs.map(doc => doc.data() as any)
            
            
            this.history = arr.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return (new Date(a.date) as any) - (new Date(b.date) as any);
            })
            // console.log(snapshot.docs.map(doc => doc.data()))
          })
          
          
        });
        
        
        
      }
      
      async send_msg(msg: string, input: HTMLInputElement){
        
        
        input.value = ""
        
        const path = [
          "users",
          this.my_uid,
          "chats",
          this.selected_chat,
          "messages"
        ].join("/")
        
        
        
        const ref_1 = collection(
          this.afs,
          [
            "users",
            this.my_uid,
            "chats",
            this.selected_chat,
            "messages"
          ].join("/"))
          
          const ref_2 = collection(
            this.afs,
            [
              "users",
              this.selected_chat,
              "chats",
              this.my_uid,
              "messages"
            ].join("/"))
            
            const date =  new Date().toUTCString()
            
            addDoc(
              ref_1,
              {
                uid: this.my_uid,
                msg,
                date
              }
              )
              addDoc(
                ref_2,
                {
                  uid: this.my_uid,
                  msg,
                  date
                }
                )
                
                
                if(this.history.length){
                  this.subscriber = onSnapshot(collection(this.afs, path), snapshot=>{
                    
                    // this.history = snapshot.docs.map(doc => doc.data() as any)
                    
                    
                    let arr = snapshot.docs.map(doc => doc.data() as any)
                    
                    
                    this.history = arr.sort(function(a,b){
                      // Turn your strings into dates, and then subtract them
                      // to get a value that is either negative, positive, or zero.
                      return (new Date(a.date) as any) - (new Date(b.date) as any);
                    })
                    // console.log(snapshot.docs.map(doc => doc.data()))
                  })
                }
                
                
                
                
              }
              
              
              async send_msg_by_enter(msg: string, input: HTMLInputElement){
                
                input.value = ""
                
                const path = [
                  "users",
                  this.my_uid,
                  "chats",
                  this.selected_chat,
                  "messages"
                ].join("/")
                
                
                
                const ref_1 = collection(
                  this.afs,
                  [
                    "users",
                    this.my_uid,
                    "chats",
                    this.selected_chat,
                    "messages"
                  ].join("/"))
                  
                  const ref_2 = collection(
                    this.afs,
                    [
                      "users",
                      this.selected_chat,
                      "chats",
                      this.my_uid,
                      "messages"
                    ].join("/"))
                    
                    const date =  new Date().toUTCString()
                    
                    addDoc(
                      ref_1,
                      {
                        uid: this.my_uid,
                        msg,
                        date
                      }
                      )
                      addDoc(
                        ref_2,
                        {
                          uid: this.my_uid,
                          msg,
                          date
                        }
                        )
                        
                        
                        if(this.history.length){
                          this.subscriber = onSnapshot(collection(this.afs, path), snapshot=>{
                            let arr = snapshot.docs.map(doc => doc.data() as any)
                            
                            
                            this.history = arr.sort(function(a,b){
                              // Turn your strings into dates, and then subtract them
                              // to get a value that is either negative, positive, or zero.
                              return (new Date(a.date) as any) - (new Date(b.date) as any);
                            })
                            
                          })
                        }
                      }        
}
                    