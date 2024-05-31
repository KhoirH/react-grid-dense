import { memo, useCallback, useEffect, useRef, useState } from "react";

type TBoxList = {
  src: string;
  style?: React.CSSProperties;
}
type TEventBoxList = {
  onItemClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, i : number) => void,
  onItemHover?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, i : number) => void
}
type TGridDense = {
  zoom?: number;
  images: TBoxList[];
  space?: string;
} & TEventBoxList;
const GridDense:React.FC<TGridDense> = (props) => {
  const {
    zoom = 1,
    images,
    space = "5px",
    onItemClick,
    onItemHover
  } = props;
  const [size, setSize] = useState<any>(null)
  const containerRef = useRef<any>(null)
  const innerScale = 9 * zoom;
  useEffect(() => {
    const handleReizeWindow = () => {
      const sizeInner = (containerRef.current.offsetWidth / innerScale) - 2;
      containerRef.current.style.gridTemplateColumns = `repeat(auto-fill, minmax(${sizeInner}px, 1fr))`
      containerRef.current.style.gridTemplateRows = `repeat(auto-fit, ${sizeInner}px)`
      setSize(sizeInner)
    }
    handleReizeWindow();
    window.addEventListener("resize", handleReizeWindow);
    return () => {
      window.removeEventListener("resize", handleReizeWindow)
    }
  }, [])
  return <>
    <div ref={containerRef} style={{
        display: "grid",
        width: "100%",
        height: "auto-fit",
        gridAutoFlow: "row dense",
        overflow:"hidden",
        alignItems: 'stretch',
        boxSizing: 'border-box',
      }}>
      {
        size ? (<>
          {
            images?.map((propsImage, i) => (
              <BoxProject index={i} space={space} onItemClick={onItemClick} onItemHover={onItemHover} scale={innerScale} key={`${size}-${i}-${innerScale}`} colSize={size} {...propsImage} />
            ))
          }
        </>
        ) : null
      }
    </div>
  </>
}

type TBoxProjectProps = {
  colSize: number;
  space?: string;
  scale: number;
  index: number;
} & TBoxList & TEventBoxList;
export function BoxProject(props: TBoxProjectProps) {
  const {
    scale,
    colSize,
    src,
    style = {},
    onItemClick,
    onItemHover,
    space,
    index,
  } = props;
  const itemRef = useRef<any>(null);
  const handleOnLoad = useCallback((e: any) => {
    if(itemRef.current) {
      const s = getSpanEstimate(e.currentTarget.height, e.currentTarget.width, scale, colSize)
      itemRef.current.style.gridColumnEnd = `span ${s.w}`
      itemRef.current.style.gridRowEnd = `span ${s.h}`
      
      e.target.style.opacity = 1;
      e.target.style.width = "100%";
    }
  }, [colSize, scale])
  return (
    <div ref={itemRef}
      onMouseEnter={(e) => {
        onItemHover?.(e, index)
      }}
      onClick={(e) => {
        onItemClick?.(e, index)
      }}
      style={{
        padding: space,
        boxSizing: 'border-box',
        cursor: 'pointer'
      }} >
      <img src={src} onLoad={handleOnLoad} style={{
        opacity: 0,
        transition: ".2s ease",
        ...style
      }} alt="project"/>
    </div>
  );
}

function getSpanEstimate(height: any, width: any, scale: any, colSize: any) {
  const rasioH = height / colSize;
  const rasioW = width / colSize;
  const spanW = Math.min(Math.ceil(rasioW), scale / 3) ;
  let spanH = Math.ceil(rasioH)
  if (rasioW > scale / 3) {
    const wSize = colSize * spanW;
    const comparationWSize = wSize / width;
    const hSize = comparationWSize * height;
    spanH = Math.ceil(hSize / colSize);
  }

  return {
    w: spanW,
    h: spanH,
  }
}


export default memo(GridDense);