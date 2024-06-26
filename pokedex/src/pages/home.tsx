import React, { useEffect, useState } from 'react'
import PokemonCard from '../components/card.tsx'
import NavBar from '../components/navbar.tsx'
import { Container, Grid } from '@mui/material'
import axios from "axios"

export const Home = () => {
    
    const [pokemons, setPokemons] = useState<any[]>([]);

    useEffect(() => {
        getUrl()
    }, [])

    const getUrl = () => {

        const endpoints: string[] = [];
        const quantidadeItensTela: number = 200; 
        
        for (let i = 1; i < quantidadeItensTela; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }

        axios.all(
            endpoints.map(
                (endpoint) => axios.get(endpoint)
            )
        ).then(
            (res) => {
                
                setPokemons(res)
            } 
        )
    }

    const filterUrl = (name: string): void => {
        const filteredData: any[] = [];

        if(name === ""){
            getUrl();
        }
        for (var i in pokemons){
            if(pokemons[i].data.name.includes(name)){
                filteredData.push(pokemons[i]);
            }

            setPokemons(filteredData);
        }
    }

    
    return( 
        <div>
            <NavBar filterUrl={filterUrl}></NavBar>
            <Container maxWidth={false} >
                <Grid container spacing={3}>
                    {pokemons.map((pokemon, key) => (
                        <Grid item xs={2} key={key}>
                            <PokemonCard name={pokemon.data.name} photo={pokemon.data.sprites.front_default}></PokemonCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}