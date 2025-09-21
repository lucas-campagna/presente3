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
import { type AvailableModels } from "@/models";
import * as models from "@/models";
import useDialog from "@/hooks/useDialog";
import modelForms from "./forms";

type ItemListType = {
  label: string;
  checked?: boolean;
} & AvailableModels[keyof AvailableModels];

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
  onItemClick?: (item: ItemListType) => void;
  onItemOptionsClick?: (item: ItemListType) => void;
}) {
  type T = AvailableModels[typeof model];
  const [searchText, setSearchText] = useState<string>();
  const [removingItems, setRemovingItems] = useState<undefined | string[]>();
  const { items: rawItems, insert } = useModel<T>(model);
  const items = useMemo<ItemListType[]>(
    () =>
      rawItems.map((item) => ({
        ...item,
        label: getLabel(item as any),
        checked: false,
      })),
    [rawItems]
  );
  const { open, close } = useDialog();

  const orderedItems = useMemo(() => {
    if (!searchText)
      return items.sort(onSort as (a: ItemListType, b: ItemListType) => number);
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
    return [...startsWith, ...contains].sort(
      onSort as (a: ItemListType, b: ItemListType) => number
    );
  }, [items, searchText]);

  const isDeleting = removingItems !== undefined;
  const isSearching = typeof searchText === "string";
  const startSearch = () => setSearchText("");
  const clearSearch = () => setSearchText(undefined);
  const startRemove = () => setRemovingItems([]);
  const stopDelete = () => setRemovingItems(undefined);

  function handleAddItem(data: any) {
    insert(data);
    close();
  }

  const MenuOnClick: {
    [key in MenuItemProps["type"]]?: () => void;
  } = {
    add: () => {
      const Form = modelForms[model];
      if (!Form) return;
      open({
        title: "Novo",
        content: <Form onSubmit={handleAddItem} />,
      });
    },
    search: startSearch,
    remove: startRemove,
  };

  function handleMenuClick(type: MenuItemProps["type"]) {
    MenuOnClick[type]?.();
    onMenuClick?.(type);
  }

  function handleItemClick(item: ItemListType) {
    if (isDeleting) {
      handlePushItemToRemoveList(item);
    } else {
      onItemClick?.(item);
    }
  }

  function handlePushItemToRemoveList(item: ItemListType) {
    const id = item.id.id as string;
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
            onClose={clearSearch}
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
        ) : menu.length < 6 ? (
          menu.map((type, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuClick(type)}
              type={type}
            />
          ))
        ) : (
          <div className="flex flex-row justify-start gap-6 overflow-x-scroll scrollbar-hidden px-3">
            {menu.map((type, index) => (
              <MenuItem
                key={index}
                onClick={() => handleMenuClick(type)}
                type={type}
              />
            ))}
          </div>
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-2 overflow-y-auto rounded-md pb-18">
        {orderedItems.map((item) => (
          <Button
            key={item.id.id as string}
            className="flex justify-between p-5"
            variant={
              isDeleting
                ? removingItems.includes(item.id.id as string)
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
    onClose,
  }: {
    text: string;
    onChange: (text?: string) => void;
    onClose: () => void;
  }) => (
    <div className="flex items-center w-full gap-2">
      <Input
        autoFocus={true}
        placeholder="Buscar..."
        value={text}
        onChange={(e: any) => onChange?.(e.target.value)}
      />
      <div onClick={onClose}>
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
