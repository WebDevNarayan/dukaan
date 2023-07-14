import { ActionIcon, createStyles, NumberInput } from "@mantine/core"
import { useCart } from "@react-providers/cart"
import { useRef, useState } from "react"
import { TbMinus, TbPlus } from "react-icons/tb"

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `6px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    border: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,

    "&:focus-within": {
      borderColor: theme.colors[theme.primaryColor][6],
    },
  },

  control: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,

    "&:disabled": {
      borderColor:
        theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3],
      opacity: 0.8,
      backgroundColor: "transparent",
    },
  },

  input: {
    textAlign: "center",
    paddingRight: `${theme.spacing.sm}px !important`,
    paddingLeft: `${theme.spacing.sm}px !important`,
    height: 28,
    flex: 1,
  },
}))

export function QuantityInput({ min = 0, max = 1000, product }) {
  const { classes } = useStyles()
  const handlers = useRef(null)
  const { cart, updateCart } = useCart()
  const [value, _setValue] = useState(
    cart.cartItems.find((cart) => cart.product.variantId === product._id)
      ?.quantity || 0
  )

  const setValue = (value) => {
    _setValue(value)
    console.log(value)
    updateCart(
      {
        ...product,
        variantId: product._id,
      },
      value
    )
  }

  return (
    <div className={classes.wrapper} >
      <ActionIcon
        size={28}
        variant='transparent'
        onClick={() => handlers.current?.decrement()}
        disabled={value === min}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
      >
        <TbMinus size={16} />
      </ActionIcon>

      <NumberInput
        variant='unstyled'
        min={min}
        max={max}
        handlersRef={handlers}
        value={value}
        onChange={setValue}
        classNames={{ input: classes.input }}
      />

      <ActionIcon
        size={28}
        variant='transparent'
        onClick={() => handlers.current?.increment()}
        disabled={value === max}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
      >
        <TbPlus size={16} />
      </ActionIcon>
    </div>
  )
}
