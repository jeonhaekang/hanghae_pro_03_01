import React from "react";
import { Badge } from "@material-ui/core";
import { Button } from "../elements/Index";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, update } from "firebase/database";

const NotiBadge = (props) => {
  const [is_read, setIsRead] = React.useState(true);
  const user_id = useSelector((state) => state.user.user.uid);
  const db = getDatabase();

  const notiCheck = () => {
    const starCountRef = ref(db, `noti/${user_id}`);
    update(starCountRef, { read: true });
    props._onClick();
  };

  React.useEffect(() => {
    const starCountRef = ref(db, `noti/${user_id}`);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.val()) {
        setIsRead(snapshot.val().read);
      } else {
        update(ref(db, `noti/${user_id}`), { read: true });
      }
    });
  }, []);
  return (
    <React.Fragment>
      <Badge
        color="secondary"
        variant="dot"
        invisible={is_read}
        onClick={notiCheck}
      >
        <Button padding="10px" margin="5px">
          알림
        </Button>
      </Badge>
    </React.Fragment>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
