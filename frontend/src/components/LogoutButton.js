export default function LogoutButton() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <button onClick={logout} style={styles.btn}>
      Logout
    </button>
  );
}

const styles = {
  btn: {
    background: "none",
    border: "1px solid #334155",
    color: "#e5e7eb",
    padding: "6px 12px",
    borderRadius: 12,
    cursor: "pointer",
  },
};
