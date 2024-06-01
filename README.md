# Grid Dense
A simple, responsive image gallery using CSS Grid with `grid-auto-flow: dense;` to ensure a compact layout by filling in gaps automatically.

## Feature
- Responsive design
- Dense packing to minimize gaps
- Easy to customize

## Demo
![Demo](assets/demo.gif

## Installation

```bash
npm i grid-dense
```

## Usage
### Example
```bash
  const images = (maxNum = 100) =>  {
    const templateImage = [
      {
        src: "https://img.freepik.com/free-photo/people-making-hands-heart-shape-silhouette-sunset_53876-15987.jpg",
      },
    ];
    const arr = [];
    for(let i = 0; i < maxNum; i++) {
      const randomNumber = Math.floor(Math.random() * templateImage.length);
      arr.push(templateImage[randomNumber]);
    }
  
    return arr;
  }
  <GridDense images={images()}
    zoom={3}
  />
```
### Property
| Prop     | Type | Description    |
|----------|-----|---------------|
| images | Images[]  | important property for each image from `src` object  |
| zoom | number  |  property for define col size. the col multiple of 9. default value of zoom is `1`    |
| space | string  | property make space each images. default value of space `5px`   
| onItemClick | func  | callback property for click every item   |
| onItemHover | string  | callback property for hover every item  |

## License
This project is licensed under the MIT License.



