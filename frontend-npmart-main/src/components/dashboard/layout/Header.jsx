import { ActionIcon, createStyles } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { TbMenu2 } from "react-icons/tb";


const useStyles = createStyles((theme) =>({
    header: {
        height: "60px",
        position: "sticky",
        top: 0,
        display:"flex",
        alignItems: "center",
        borderBottom: `1px solid ${theme.colors.gray[3]}`,
        padding: `0 ${theme.spacing.md}px`
    },
    logo: {
        display: "flex",
        alignItems:"center",
        marginLeft: theme.spacing.md,
        marginTop: theme.spacing.xs
    }   

}))

const Header = () => {
    const {classes} = useStyles()
    const [opened, setOpened] = useLocalStorage({
        key: "sidebar-opened",
        defaultValue: true
    })
  return(
    
    <header className={classes.header}>
        <ActionIcon 
        onClick={() => {
            setOpened(!opened)
        }}>
            <TbMenu2/>
        </ActionIcon>
       
    </header>
  )
};
export default Header;