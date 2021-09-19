import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";


const Dialogs = (props) => {
  let dialogsData = [
    { id: 1, name: "Pashtet" },
    { id: 2, name: "Iana" },
    { id: 3, name: "Dasha" },
    { id: 4, name: "Masha" },
    { id: 5, name: "Durik" },
    { id: 6, name: "Borovik" },
  ];

  let messagesData = [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your business?" },
    { id: 3, message: "Yo!" },
    { id: 4, message: "Yo!" },
    { id: 5, message: "Yo!" },
    { id: 6, message: "Yo!" },
  ];

  let dialogsElements = dialogsData.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messagesElements = messagesData.map((m) => (
    <Message message={m.message} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
    </div>
  );
};

export default Dialogs;
