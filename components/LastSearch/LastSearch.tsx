/* eslint-disable react/no-unused-prop-types */
import { PageContext } from "@/context";
import { useLocalStorage } from "@/hooks";
import { useContext } from "react";
import { getContent, getSimilars, setLastSearch } from "@/context/actions";
import Image from "next/image";
import { CurrentValues } from "@/utils/lastSearch";
import { updateParams } from "@/utils";
import { Trash } from "lucide-react";
import { Rating } from "../Rating";
import { Button } from "../Button/Button";

export const LastSearch = () => {
  const {
    state: { lastSearch, BASE_IMAGE_URL, watchRegion },
    dispatch,
  } = useContext(PageContext);
  const { storage } = useLocalStorage();

  if (!lastSearch) return null;

  const handleRemove = () => {
    storage.remove("qpv-lastSearch");
    setLastSearch(dispatch, null);
  };

  const handleLoadContent = async (id: number, source: string) => {
    if (id) {
      window.scrollTo(0, 0);
      updateParams({
        newSource: source!,
        newWatchRegion: watchRegion,
        id: id.toString(),
      });
      await getContent(dispatch, source, id, watchRegion);
      await getSimilars(dispatch, source, id, watchRegion);
    }
  };

  return (
    <div className="text-white mt-20">
      <div className="flex justify-between gap-10 px-4 items-center mb-4 md:justify-start">
        <h1>Historial de búsquedas</h1>
        <Button
          className="w-6 h-6 rounded-full p-1"
          size="sm"
          title="Eliminar historial"
          variant="destructive"
          onClick={handleRemove}
        >
          <Trash className="w-3 h-3" />
        </Button>
      </div>
      <div className="py-6 px-10 gap-3 grid grid-cols-1 md:grid-cols-2">
        {lastSearch?.map(
          ({
            name,
            image,
            votes,
            id,
            source,
          }: CurrentValues & { source: string }) => (
            <div
              key={`search-${name}`}
              className="flex gap-4 cursor-pointer"
              onClick={() => handleLoadContent(id, source)}
            >
              <div className="w-[60px] h-[90px] rounded-md shadow-sm overflow-hidden">
                <Image
                  alt={name}
                  height={60}
                  src={`${BASE_IMAGE_URL}${image}`}
                  width={60}
                />
              </div>
              <div className="h-full gap-2 flex flex-col justify-center relative">
                <p className="absolute top-1 left-0 text-xs text-gray-400">{`(${source === 'tv' ? "Serie" : 'Pelicula'})`}</p>
                <p>{name}</p>
                <Rating rating={votes} />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
