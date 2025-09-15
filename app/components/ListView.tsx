import { Separator } from "~/components/ui/separator";
import { Skeleton } from "./ui/skeleton";
import type React from "react";
import {
  ArrowDownAZ,
  ArrowDownZA,
  ArrowLeft,
  BookPlus,
  EllipsisVertical,
  FolderSearch,
  SearchCheck,
  Shredder,
  SquarePlus,
  UserPlus,
  UserSearch,
  UserX,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { memo, useMemo, useReducer, useState } from "react";
import { Input } from "./ui/input";
import type { MenuType } from "./MenuItem";
import MenuItem from "./MenuItem";
// import useDialog from "~/hooks/useDialog";

type TypedMenuType = {
  type: keyof (typeof IconsMode)["default"];
  onClick?: () => void;
};

type ItemType = {
  key: string;
  label: string;
  checked?: boolean;
  onClick?: () => void;
  onEllipsisClick?: () => void;
  children?: () => React.ReactNode;
};

const IconsMode = {
  default: {
    add: <SquarePlus />,
    search: <SearchCheck />,
    order: <ArrowDownAZ />,
    delete: <Shredder />,
  },
  user: {
    add: <UserPlus />,
    search: <UserSearch />,
    order: <ArrowDownAZ />,
    delete: <UserX />,
  },
  class: {
    add: <BookPlus />,
    search: <FolderSearch />,
    order: <ArrowDownAZ />,
    delete: <Shredder />,
  },
};

function ListView({
  title,
  menu,
  items,
  onRemove,
}: {
  title?: string;
  menu: MenuType[];
  items: ItemType[];
  onRemove?: (indexes: number[]) => void;
}) {
  const [searchText, setSearchText] = useState<string>();
  const [sortedAZ, setSortedAZ] = useState(true);
  const [deleteItems, setDelteItems] = useState<undefined | number[]>();
  // const { open } = useDialog();

  const orderedItems = useMemo(() => {
    const sortFunc = sortedAZ
      ? (a: ItemType, b: ItemType) =>
          (a.label ?? "").localeCompare(b.label ?? "")
      : (a: ItemType, b: ItemType) =>
          (b.label ?? "").localeCompare(a.label ?? "");
    if (searchText) {
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
      return [...startsWith, ...contains].sort(sortFunc);
    }
    return items.sort(sortFunc);
  }, [items, sortedAZ, searchText]);

  const isDeleting = deleteItems !== undefined;
  const isSearching = typeof searchText === "string";
  const toggleOrder = () => setSortedAZ((v) => !v);
  const startSearch = () => setSearchText("");
  const clearSearch = () => setSearchText(undefined);
  const startDelete = () => setDelteItems([]);
  const stopDelete = () => setDelteItems(undefined);

  const MenuOnClick: {
    [key in MenuType["type"]]: () => void;
  } = {
    'search': startSearch,
    'order': toggleOrder,
    'delete': startDelete,
  }

  function handleAddItemToDelete(index: number) {
    if (isDeleting) {
      if (deleteItems.includes(index)) {
        setDelteItems(deleteItems.filter((i) => i !== index));
      } else {
        setDelteItems([...deleteItems, index]);
      }
      return;
    }
  }

  function handleDeleteItens() {
    if (!isDeleting) return;
    // open({
    //   title: "Tem certeza?",
    //   description: "Não há como desfazer essa ação.",
    //   action: "Sim",
    //   onAction: () => {
    //     onRemove?.(deleteItems);
    //     setDelteItems(undefined);
    //   },
    // });
  }

  const hasTitle = title !== undefined && !isSearching && !isDeleting;

  return (
    <div className="flex flex-col justify-start items-stretch size-full gap-4 overflow-y-hide">
      {!hasTitle ? undefined : title ? (
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
            <Button
              variant="outline"
              className=""
              onClick={() => setDelteItems(undefined)}
            >
              <div className="flex items-center gap-2">
                <X />
                <span>Cancelar</span>
              </div>
            </Button>
            <Button
              variant="destructive"
              className=""
              onClick={handleDeleteItens}
              disabled={deleteItems?.length === 0}
            >
              <div className="flex items-center gap-2">
                <Shredder />
                <span>Remover</span>
              </div>
            </Button>
          </div>
        ) : (
          menu.map((item, index) => (
            <MenuItem
              key={index}
              onClick={MenuOnClick[item.type]}
              {...item}
            />
          ))
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-2 overflow-y-auto rounded-md pb-18">
        {orderedItems.map(
          (
            { key, checked, onClick, onEllipsisClick, label, children },
            index
          ) => (
            <Button
              key={key}
              className="flex justify-between"
              variant={
                isDeleting
                  ? deleteItems.includes(index)
                    ? "default"
                    : "outline"
                  : checked || checked === undefined
                    ? "default"
                    : "outline"
              }
            >
              <div
                className="w-full flex"
                onClick={() =>
                  isDeleting ? handleAddItemToDelete(index) : onClick?.()
                }
              >
                {children?.() ?? label}
              </div>
              {!isDeleting && onEllipsisClick && (
                <span onClick={onEllipsisClick}>
                  <EllipsisVertical />
                </span>
              )}
            </Button>
          )
        )}
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
