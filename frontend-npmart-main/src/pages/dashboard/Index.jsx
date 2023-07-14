import { createStyles } from "@mantine/core";
import withPageAuthRequired from "../../components/auth/withPageAuthRequired";

const DashboardIndex = () => {
  const useStyles = createStyles(() => ({
    container: {
      display: "grid",
      width: "100%",
    },
    dash: {
      display: "flex",
      flexDirection: "column",
    },
    total: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "2px 4px",
    },
    box: {
      width: "30%",
      border: "1px solid #dadada",
      padding: "10px",
      borderRadius: "10px",
    },
    img: { borderRadius: "50%" },
    stat: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    text: {
      padding: "0px",
      margin: "0px",
    },
    p: { lineHeight: "1.5" },
  }));
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.dash}>
          <h3>Dashboard</h3>
        </div>
        <div className={classes.total}>
          <div className={classes.box}>
            <div className={classes.img}>
              <img src="/sale_.png" height="60px" alt="total sales" />
            </div>
            <div className={classes.text}>
              <p>Total Sales</p>
              <p>Rs: 120000</p>
            </div>
          </div>
          <div className={classes.box}>
            <div className={classes.img}>
              <img src="/order_.png" height="60px" alt="total orders" />
            </div>
            <div className={classes.text}>
              <p>Total Products</p>
              <p>12</p>
            </div>
          </div>
          <div className={classes.box}>
            <div className={classes.img}>
              <img src="/prod_.png" height="60px" alt="total products" />
            </div>
            <div className={classes.text}>
              <p>Total Orders</p>
              <p>20</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withPageAuthRequired(DashboardIndex);
