import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Grid, Typography, Divider, Stack } from '@mui/material'

function Treemap() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost/Prologin2/public/api/rank')
            .then(response => response.json())
            .then(data => {
                const a = Object.values(data.merged_data);
                const boardScores = calculateBoardScores(a);
                const treemapData = formatDataForTreemap(boardScores);
                setData(treemapData);
            })
            .catch(error => console.error('Error fetching:', error));
    }, []);

    // 根據文章的創建時間計算分數
    const getTimeScore = (PostTime) => {
        const dateDiff = Math.ceil((new Date() - new Date(PostTime)) / (1000 * 3600 * 24));
        if (dateDiff > 7) return 0;
        else if (dateDiff > 3) return 1;
        else return 2;
    };

    // 計算每個看板的熱門分數總和
    const calculateBoardScores = (data) => {
        const boardScores = {};
        data.forEach(item => {
            const score = 10 + (item.total_likes + item.total_dislikes) * getTimeScore(item.PostTime);
            if (boardScores[item.product_tag]) {
                boardScores[item.product_tag] += score;
            } else {
                boardScores[item.product_tag] = score;
            }
        });
        return boardScores;
    };

    // 按照熱門分數總和對看板進行排序並格式化成 Treemap 需要的格式
    const formatDataForTreemap = (boardScores) => {
        const totalScore = Object.values(boardScores).reduce((acc, curr) => acc + curr, 0);
        const treemapData = [];
        for (const board in boardScores) {
            treemapData.push({
                x: board,
                y: ((boardScores[board] / totalScore) * 100).toFixed(2) // 轉換成百分比並保留兩位小數
            });
        }
        treemapData.sort((a, b) => b.y - a.y); //排序
        return [{ data: treemapData }];
    };

    const options = {
        legend: {
            // show: false
        },
        chart: {
            maxHeight: '100%',
            type: 'treemap'
        },
        // title: {
        //     // text: '各看板文章熱門分數百分比',
        //     align: 'center'
        // },
        colors: [
            '#c53a2c',
            '#d14031',
            '#d44d3f',
            '#d85a4c',
            '#db675a',
            '#de7368',
            '#e18076',
            '#e48d84',
            '#e79a92',
            '#eaa7a0',
            '#edb4ae',
            '#f0c1bc'
        ],
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false
            }
        },
        // 新增文字大小設定
        dataLabels: {
            style: {
                fontSize: '20px'
            }
        }
    };
    return (
        <>
            <div id="chart">
                <ReactApexChart options={options} series={data} type="treemap" height={350} />
            </div>
            <div id="html-dist"></div>
        </>
    )
}

export default Treemap