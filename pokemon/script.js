const progress = document.getElementById('progress');
const pokemonBtn = document.getElementById('pokemon-btn');

pokemonBtn.addEventListener('click', async() => {
    //สุ่มเลข ID ของโปเกมอน
    const randomId = Math.floor(Math.random() * 1025) + 1;
    const findPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await findPokemon.json();
    console.log(data);

    //ลบการ์ดเก่าออก 
    progress.innerHTML = ``;
    
    //สร้าง elements + ใส่ class css
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    //แสดงรูปภาพโปเกมอน
    const img = document.createElement('img');
    img.src = data.sprites.front_default;

    //แสดงชื่อโปเกมอน
    const nameText = document.createElement('p');
    nameText.textContent = data.name;
    
    card.append(img);
    card.append(nameText);

    progress.append(card);
});

