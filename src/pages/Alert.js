import React from "react";
import AlertCard from "../components/AlertCard";

import {
  getDatabase,
  ref,
  onValue,
  set,
  query,
  orderByChild,
} from "firebase/database";
import { useSelector } from "react-redux";

const Alert = (props) => {
  const db = getDatabase();
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = React.useState([]);

  React.useEffect(() => {
    if (!user) {
      return;
    }

    const _noti_list = query(
      ref(db, `noti/${user.uid}/list`),
      orderByChild("insert_dt")
    );

    onValue(
      _noti_list,
      (snapshot) => {
        if (snapshot.exists()) {
          let _data = snapshot.val();
          console.log(_data);

          let _noti_list = Object.keys(_data)
            .reverse()
            .map((s) => {
              return _data[s];
            });

          setNoti(_noti_list);
        }
      },
      { onlyOnce: true }
    );
  }, [user]);

  return (
    <React.Fragment>
      {noti.map((n, i) => {
        return <AlertCard key={i} {...n} />;
      })}
    </React.Fragment>
  );
};

export default Alert;
