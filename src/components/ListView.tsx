import { Separator } from "@/components/ui/separator";
import { Skeleton } from "./ui/skeleton";
import { EllipsisVertical, Shredder, X } from "lucide-react";
import { Button } from "./ui/button";
import { memo, useMemo, useState } from "react";
import { Input } from "./ui/input";
import type { MenuItemProps } from "./MenuItem";
import MenuItem from "./MenuItem";
import BaseDialog from "./BaseDialog";
import useModel from "@/hooks/useModel";
import { getLabel, type AvailableModels } from "@/models";
import useDialog from "@/hooks/useDialog";
import ClassForm from "@/components/forms/Class";

type ItemType = {
  id: string;
  label: string;
  checked?: boolean;
};

function ListView({
  title,
  menu,
  model,
  onSort = (a: ItemType, b: ItemType) => a.label.localeCompare(b.label),
  onMenuClick,
  onItemClick,
  onItemOptionsClick,
}: {
  title?: string;
  menu: MenuItemProps["type"][];
  model: keyof AvailableModels;
  onSort?: (a: ItemType, b: ItemType) => number;
  onMenuClick?: (type: string) => void;
  onItemClick?: (item: ItemType) => void;
  onItemOptionsClick?: (item: ItemType) => void;
}) {
  type ModelType = AvailableModels[typeof model];
  const [searchText, setSearchText] = useState<string>();
  const [removingItems, setRemovingItems] = useState<undefined | string[]>();
  const { items: rawItems, create } = useModel<ModelType>(model);
  const items = useMemo<ItemType[]>(
    () =>
      rawItems.map((item) => ({
        id: item.id,
        label: getLabel[model](item),
        checked: false,
      })),
    [rawItems]
  );
  const { open } = useDialog();

  const orderedItems = useMemo(() => {
    if (!searchText) return items.sort(onSort);
    const lowerCaseSearchText = searchText.toLowerCase();
    const startsWith = items.filter((s) =>
      s.label.toLowerCase().startsWith(lowerCaseSearchText)
    );
    const startsWithNames = startsWith.map((s) => s.label.toLowerCase());
    const contains = items.filter((s) => {
      const lowerCaseLabel = s.label.toLowerCase();
      return (
        lowerCaseLabel.includes(lowerCaseSearchText) &&
        !startsWithNames.includes(lowerCaseLabel)
      );
    });
    return [...startsWith, ...contains].sort(onSort);
  }, [items, searchText]);

  const isDeleting = removingItems !== undefined;
  const isSearching = typeof searchText === "string";
  const startSearch = () => setSearchText("");
  const clearSearch = () => setSearchText(undefined);
  const startRemove = () => setRemovingItems([]);
  const stopDelete = () => setRemovingItems(undefined);

  const MenuOnClick: {
    [key in MenuItemProps["type"]]?: () => void;
  } = {
    add: () => {
      open({
        title: "Novo",
        content: <ClassForm onSubmit={console.log} defaultValues={{}} />,
      });
      // create();
    },
    search: startSearch,
    remove: startRemove,
  };

  function handleMenuClick(type: MenuItemProps["type"]) {
    MenuOnClick[type]?.();
    onMenuClick?.(type);
  }

  function handleItemClick(item: ItemType) {
    if (isDeleting) {
      handlePushItemToRemoveList(item.id);
    } else {
      onItemClick?.(item);
    }
  }

  function handlePushItemToRemoveList(id: string) {
    if (!isDeleting) return;
    if (removingItems.includes(id)) {
      setRemovingItems(removingItems.filter((itemId) => itemId !== id));
    } else {
      setRemovingItems([...removingItems, id]);
    }
  }

  function handleDeleteItens() {
    if (!isDeleting) return;
    // open({
    //   title: "Tem certeza?",
    //   description: "Não há como desfazer essa ação.",
    //   action: "Sim",
    //   onAction: () => {
    //     stopDelete();
    //   },
    // });
  }

  const hasTitle = title !== undefined && !isSearching && !isDeleting;

  return (
    <div className="flex flex-col justify-start items-stretch size-full gap-4 overflow-y-hide p-4">
      {!hasTitle ? null : title ? (
        <span>{title}</span>
      ) : (
        <Skeleton className="h-[24px] w-[150px] rounded-full" />
      )}
      <div className="flex pt-4 justify-around">
        {isSearching ? (
          <SearchInput
            text={searchText}
            onChange={(text) => setSearchText(text)}
          />
        ) : isDeleting ? (
          <div className="flex justify-around w-full items-center gap-2">
            <Button variant="outline" className="" onClick={stopDelete}>
              <div className="flex items-center gap-2">
                <X />
                <span>Cancelar</span>
              </div>
            </Button>
            <BaseDialog
              title="Remover itens"
              description="Tem certeza que deseja remover os itens selecionados? Esta ação não pode ser desfeita."
              cancel={
                <Button variant="outline" className="" onClick={stopDelete}>
                  Cancelar
                </Button>
              }
            >
              <Button
                variant="destructive"
                className=""
                onClick={handleDeleteItens}
                disabled={removingItems?.length === 0}
              >
                <div className="flex items-center gap-2">
                  <Shredder />
                  <span>Remover</span>
                </div>
              </Button>
            </BaseDialog>
          </div>
        ) : (
          menu.map((type, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuClick(type)}
              type={type}
            />
          ))
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-2 overflow-y-auto rounded-md pb-18">
        {orderedItems.map((item) => (
          <Button
            key={item.id}
            className="flex justify-between"
            variant={
              isDeleting
                ? removingItems.includes(item.id)
                  ? "default"
                  : "outline"
                : item.checked || item.checked === undefined
                ? "default"
                : "outline"
            }
          >
            <div className="w-full flex" onClick={() => handleItemClick(item)}>
              {item.label}
            </div>
            {!isDeleting && onItemOptionsClick && (
              <span onClick={() => onItemOptionsClick(item)}>
                <EllipsisVertical />
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}

const SearchInput = memo(
  ({
    text,
    onChange,
  }: {
    text?: string;
    onChange?: (text?: string) => void;
  }) => (
    <div className="flex items-center w-full gap-2">
      <Input
        autoFocus={true}
        placeholder="Buscar..."
        value={text}
        onChange={(e: any) => onChange?.(e.target.value)}
      />
      <div onClick={() => onChange?.(undefined)}>
        <X />
      </div>
    </div>
  )
);

const LoadingIcons = memo(() => (
  <>
    {Array(3)
      .fill(0)
      .map((_, i) => (
        <Skeleton key={i} className="h-[36px] w-full rounded-md bg-primary" />
      ))}
  </>
));

export default ListView;
