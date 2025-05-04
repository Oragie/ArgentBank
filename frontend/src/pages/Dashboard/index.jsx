import "./dashboard.scss";
import EditNameForm from "../../components/EditNameForm";
import AccountCard from "../../components/AccountCard";
import { getAccountData } from "./../../api/apiService";
import { selectUser } from "../../state/selectors";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Dashboard() {
  const { id } = useSelector(selectUser); // l'id de l'utilisateur connecté

  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    async function fetchData(id) {
      const allAccounts = await getAccountData();
      if (allAccounts) {
        const filtered = allAccounts.filter(
          (account) => account.userId[0] === id
        );
        setUserAccounts(filtered);
      }
    }
    console.log("id Test", id);
    fetchData(id);
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
