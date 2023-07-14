import { Drawer, Group, Image, Paper, Stack, Text } from "@mantine/core";

const CategoryDrawer = ({ opened, setOpened, category }) => {
  const onClose = () => setOpened(false);
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      padding="md"
      title={`View ${category.title}`}
    >
      <Image
        src={category.image}
        width={"100%"}
        style={{
          image: { aspectRatio: "1/1" },
        }}
      />

      <Stack mt="sm">
        <Text>
          <strong>Title:</strong> {category.title}{" "}
        </Text>
        <div>
          <Text>
            <strong>Parent:</strong>
            {!category.parent && "N/A"}
          </Text>
          {category.parent && (
            <Paper withBorder p="sm">
              <Group>
                <Image
                  radius="sm"
                  withPlaceholder
                  src={category.parent.image}
                  height={50}
                  width={50}
                />
                <Text>{category.parent.title}</Text>
              </Group>
            </Paper>
          )}
        </div>
      </Stack>
    </Drawer>
  );
};
export default CategoryDrawer;
