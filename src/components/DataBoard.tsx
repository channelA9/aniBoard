import React, { useState } from "react";


const DataBoard = (props:{avgScore: number, totalFavs: number, totalReviews: number}) => {

    return (
        <div className="w-full max-w-screen-md xl:max-w-screen-lg min-h-64 p-4 mt-2 bg-white  rounded-sm">
            <h2 className="font-bold text-2xl">Data</h2>
            <div className="grid grid-cols-3">
                <div className="flex place-content-center place-items-center flex-col">
                    <h3>AVERAGE SCORE</h3>
                    <h3 className="text-xl">{props.avgScore}</h3>
                </div>
                <div className="flex place-content-center place-items-center flex-col">
                    <h3>TOTAL FAVORITES</h3>
                    <h3 className="text-xl">{props.totalFavs}</h3>
                </div>
                <div className="flex place-content-center place-items-center flex-col">
                    <h3>TOTAL REVIEWS</h3>
                    <h3 className="text-xl">{props.totalReviews}</h3>
                </div>
            </div>
        </div>
    )
}

export default DataBoard