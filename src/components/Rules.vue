<template>

    <div class="card">
        <img src="https://via.placeholder.com/300" alt="Card Image">
        <div class="card-content">
            <h2>Card Title</h2>
            <p>This is a sample description for the responsive card component.</p>
            <button>Learn More</button>
        </div>
    </div>

</template>


<style scoped>
.card {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    text-align: center;
    width: 300px;
    margin-right: auto;
    margin-left: auto;
}

.card:hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 4px 12px 0px;
    transform: scale(1.2);
    transition: 1;
}

.card-content {
    color: blue;
}
</style>