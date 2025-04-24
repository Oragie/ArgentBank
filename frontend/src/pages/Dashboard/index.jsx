import "./dashboard.scss";
import EditNameForm from "../../components/EditNameForm";
import AccountCard from "../../components/AccountCard";
import { getAccountData } from "../../api/user";
import { selectUser } from "../../state/selectors";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Dashboard() {
  const { id } = useSelector(selectUser); // l'id de l'utilisateur connecté
  console.log({ id });
  const [userAccounts, setUserAccounts] = useState([]);
  console.log("initacc", userAccounts);

  useEffect(() => {
    async function fetchData() {
      const allAccounts = await getAccountData();
      if (allAccounts) {
        console.log({ id, acc: allAccounts[0] });
        const filtered = allAccounts.filter(
          (account) => account.userId[0] === id
        );
        setUserAccounts(filtered);
        console.log("setacc", setUserAccounts);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className="bodyPage">
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back</h1>
          <EditNameForm />
        </div>
        <AccountCard accounts={userAccounts} />
      </main>
    </div>
  );
}

export default Dashboard;
